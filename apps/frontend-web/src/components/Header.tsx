import { Settings, Shield, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const Header = () => {
  return (
    <header className="bg-gradient-primary text-primary-foreground shadow-elegant">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/9729d442-4085-43b1-a25b-092e1a1e2549.png" 
              alt="Merlix Logo" 
              className="h-6 sm:h-8 w-auto"
            />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white/10 text-primary-foreground border-white/20 hover:bg-white/20"
              onClick={() => window.location.href = '/admin'}
            >
              <Shield className="h-4 w-4 mr-2" />
              Administração
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white/10 text-primary-foreground border-white/20 hover:bg-white/20"
              onClick={() => window.location.href = '/settings'}
            >
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-primary-foreground hover:bg-white/10"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => window.location.href = '/admin'}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Administração
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => window.location.href = '/settings'}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Configurações
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;