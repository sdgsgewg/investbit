import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import NavbarMobileAuth from "./NavbarMobileAuth";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MobileMenuSheet = ({ open, onClose, children }: Props) => {
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 md:hidden bg-background border-l shadow-2xl flex flex-col"
          >
            <div className="flex h-16 items-center px-4 justify-between border-b shrink-0">
              <span className="font-bold text-2xl bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Menu
              </span>
              <button
                className="p-2 text-foreground hover:bg-muted rounded-md focus:outline-none"
                onClick={onClose}
                aria-label="Close Mobile Menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col space-y-6">
              {children}

              {/* Mobile Auth section */}
              <NavbarMobileAuth onClose={onClose} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenuSheet;
