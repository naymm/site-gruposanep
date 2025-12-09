import { useEffect } from 'react';

declare global {
  interface Window {
    google?: {
      translate: {
        TranslateElement: {
          new (options: {
            pageLanguage: string;
            includedLanguages: string;
            layout: number;
            autoDisplay: boolean;
          }, elementId: string): void;
        };
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const GOOGLE_TRANSLATE_ELEMENT_ID = 'google_translate_element';

/**
 * Função para remover a tradução e voltar ao português original
 */
function revertToOriginal() {
  // Remover classes de tradução do body
  document.body.classList.remove('translated-ltr', 'translated-rtl');
  
  // Remover atributos de tradução de todos os elementos
  const allElements = document.querySelectorAll('*');
  allElements.forEach((el) => {
    if (el.hasAttribute('data-original')) {
      const original = el.getAttribute('data-original');
      if (original && el.textContent !== original) {
        el.innerHTML = original;
      }
      el.removeAttribute('data-original');
    }
  });

  // Remover iframes do Google Translate
  const iframes = document.querySelectorAll(
    '.goog-te-banner-frame, .goog-te-menu-frame, .goog-te-menu-value'
  );
  iframes.forEach((iframe) => {
    (iframe as HTMLElement).style.display = 'none';
  });

  // Limpar cache do Google Translate
  if (window.google?.translate) {
    try {
      const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (select) {
        // Resetar para o idioma original
        select.value = '';
        // Forçar evento de mudança
        const event = new Event('change', { bubbles: true });
        select.dispatchEvent(event);
      }
    } catch (e) {
      console.log('Erro ao reverter tradução:', e);
    }
  }
}

/**
 * Hook para controlar o Google Translate
 */
export function useGoogleTranslate(language: string) {
  useEffect(() => {
    // Mapear nossos códigos de idioma para os códigos do Google Translate
    const languageMap: Record<string, string> = {
      pt: 'pt',
      es: 'es',
      en: 'en',
      fr: 'fr',
    };

    const googleLang = languageMap[language] || 'pt';

    // Se for português, reverter para o original
    if (googleLang === 'pt') {
      revertToOriginal();
      return;
    }

    // Função para inicializar o Google Translate
    const initGoogleTranslate = () => {
      if (window.google?.translate) {
        // Remover elemento anterior se existir
        let existingElement = document.getElementById(GOOGLE_TRANSLATE_ELEMENT_ID);
        if (existingElement) {
          existingElement.innerHTML = '';
        } else {
          // Criar novo elemento de tradução
          const translateElement = document.createElement('div');
          translateElement.id = GOOGLE_TRANSLATE_ELEMENT_ID;
          translateElement.style.display = 'none'; // Ocultar o widget padrão
          document.body.appendChild(translateElement);
        }

        // Inicializar o Google Translate
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'pt',
            includedLanguages: 'pt,es,en,fr',
            layout: 0, // Layout simples
            autoDisplay: false, // Não mostrar automaticamente
          },
          GOOGLE_TRANSLATE_ELEMENT_ID
        );

        // Aguardar um pouco e então mudar o idioma
        setTimeout(() => {
          changeLanguage(googleLang);
        }, 500);
      }
    };

    // Função para mudar o idioma
    const changeLanguage = (lang: string) => {
      const select = document.querySelector<HTMLSelectElement>(
        '.goog-te-combo'
      );
      if (select && lang !== 'pt') {
        select.value = lang;
        const event = new Event('change', { bubbles: true });
        select.dispatchEvent(event);
      }
    };

    // Carregar o script do Google Translate se ainda não estiver carregado
    if (!window.google?.translate) {
      // Verificar se o script já está sendo carregado
      const existingScript = document.querySelector(
        'script[src*="translate.google.com"]'
      );
      
      if (!existingScript) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src =
          'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;

        // Função de callback global
        window.googleTranslateElementInit = () => {
          initGoogleTranslate();
        };

        document.head.appendChild(script);
      } else {
        // Se o script já existe, aguardar e inicializar
        const checkGoogle = setInterval(() => {
          if (window.google?.translate) {
            clearInterval(checkGoogle);
            initGoogleTranslate();
          }
        }, 100);

        // Timeout de segurança
        setTimeout(() => clearInterval(checkGoogle), 5000);
      }
    } else {
      // Se já estiver carregado, apenas mudar o idioma
      if (googleLang !== 'pt') {
        changeLanguage(googleLang);
      }
    }
  }, [language]);
}

/**
 * Hook para ocultar o banner padrão do Google Translate
 */
export function hideGoogleTranslateBanner() {
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'google-translate-hide-styles';
    style.textContent = `
      .goog-te-banner-frame {
        display: none !important;
      }
      .goog-te-balloon-frame {
        display: none !important;
      }
      body {
        top: 0 !important;
      }
      .skiptranslate {
        display: none !important;
      }
      /* Ocultar o seletor padrão do Google Translate */
      #google_translate_element {
        display: none !important;
      }
      .goog-te-combo {
        display: none !important;
      }
      /* Garantir que elementos traduzidos não quebrem o layout */
      .translated-ltr,
      .translated-rtl {
        direction: inherit !important;
      }
    `;
    
    // Só adicionar se não existir
    if (!document.getElementById('google-translate-hide-styles')) {
      document.head.appendChild(style);
    }

    return () => {
      const existingStyle = document.getElementById('google-translate-hide-styles');
      if (existingStyle && existingStyle.parentNode) {
        existingStyle.parentNode.removeChild(existingStyle);
      }
    };
  }, []);
}
