/**
 * Layout específico para área administrativa
 * Sem header/footer do site principal
 */

import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth, useSignOut } from '@/hooks/useAuth';
import { LogOut, Home, Newspaper, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user } = useAuth();
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut.mutateAsync();
      navigate('/admin/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const getUserInitials = () => {
    if (!user?.email) return 'A';
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header Admin */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container-wide">
          <div className="flex items-center justify-between h-16">
            {/* Logo e Navegação */}
            <div className="flex items-center gap-8">
              <Link to="/admin/noticias" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Newspaper className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-serif font-bold text-xl text-foreground">
                  Admin
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                >
                  <Link to="/admin/noticias">Notícias</Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                >
                  <Link to="/admin/candidaturas">Candidaturas</Link>
                </Button>
              </nav>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                asChild
              >
                <Link to="/" target="_blank">
                  <Home className="w-4 h-4 mr-2" />
                  Ver Site
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.email || 'Admin'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        Administrador
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/admin/noticias">
                      <Newspaper className="w-4 h-4 mr-2" />
                      Gerenciar Notícias
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin/candidaturas">
                      <Users className="w-4 h-4 mr-2" />
                      Gerenciar Candidaturas
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-destructive focus:text-destructive"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>

      {/* Footer Admin (opcional, minimalista) */}
      <footer className="bg-card border-t border-border py-4 mt-auto">
        <div className="container-wide">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>Painel Administrativo - Grupo SANEP</p>
            <p>© {new Date().getFullYear()} Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

