"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Download, Trash2, Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import { useTranslations } from "next-intl";

interface TierItem {
  id: string;
  text: string;
  tier: string;
}

const TIERS = [
  { id: "S", label: "S", color: "#ef4444" }, // red-500
  { id: "A", label: "A", color: "#f97316" }, // orange-500
  { id: "B", label: "B", color: "#facc15" }, // yellow-400
  { id: "C", label: "C", color: "#4ade80" }, // green-400
  { id: "D", label: "D", color: "#3b82f6" }, // blue-500
];

const STORAGE_KEY = "text-tier-list-maker-items";

export default function TextTierListMaker() {
  const t = useTranslations("text_tier_list_maker");
  
  const [items, setItems] = useState<TierItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dropZone, setDropZone] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const tierListRef = useRef<HTMLDivElement>(null);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDarkTheme(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setItems(parsed);
        if (parsed.length > 0) {
          toast.success(t("toast.restored", { count: parsed.length }));
        }
      }
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
    }
  }, [t]);

  // Save to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }, [items]);

  // Add new text item
  const handleAddItem = useCallback(() => {
    const trimmedText = inputValue.trim();
    
    if (!trimmedText) {
      toast.error(t("toast.please_enter_text"));
      return;
    }

    // Check text length
    if (trimmedText.length > 50) {
      toast.error(t("toast.text_too_long"));
      return;
    }

    const newItem: TierItem = {
      id: `item-${Date.now()}-${Math.random()}`,
      text: trimmedText,
      tier: "D",
    };

    setItems((prev) => [...prev, newItem]);
    setInputValue("");
    toast.success(t("toast.item_added"));
  }, [inputValue, t]);

  // Handle Enter key press
  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  }, [handleAddItem]);

  // Remove item
  const handleRemoveItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success(t("toast.item_removed"));
    setShowMobileMenu(false);
    setSelectedItem(null);
  }, [t]);

  // Clear all items
  const handleClearAll = useCallback(() => {
    if (items.length === 0) {
      toast.info(t("toast.no_items_to_clear"));
      return;
    }
    
    if (confirm(t("toast.confirm_clear"))) {
      setItems([]);
      localStorage.removeItem(STORAGE_KEY);
      toast.success(t("toast.all_items_cleared"));
    }
  }, [items.length, t]);

  // Save as image
  const handleSaveImage = useCallback(async () => {
    if (!tierListRef.current) return;
    
    if (items.length === 0) {
      toast.error(t("toast.please_add_items"));
      return;
    }

    setIsExporting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(tierListRef.current, {
        backgroundColor: isDarkTheme ? "#1a1a1a" : "#ffffff",
        scale: 2,
      });

      const link = document.createElement("a");
      link.download = `text-tier-list-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      
      toast.success(t("toast.image_saved"));
    } catch (error) {
      console.error("Error saving image:", error);
      toast.error(t("toast.failed_to_save"));
    } finally {
      setIsExporting(false);
    }
  }, [items.length, isDarkTheme, t]);

  // Drag handlers
  const handleDragStart = useCallback((itemId: string) => {
    setDraggedItem(itemId);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setDropZone(null);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDragEnter = useCallback((tierId: string) => {
    setDropZone(tierId);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDropZone(null);
  }, []);

  const handleDrop = useCallback(
    (tierId: string) => {
      if (!draggedItem) return;

      setItems((prev) =>
        prev.map((item) =>
          item.id === draggedItem ? { ...item, tier: tierId } : item
        )
      );
      setDraggedItem(null);
      setDropZone(null);
      toast.success(t("toast.moved_to_tier", { tier: tierId }));
    },
    [draggedItem, t]
  );

  // Double click to move item
  const handleDoubleClick = useCallback((itemId: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === itemId);
      if (!item) return prev;

      const currentIndex = TIERS.findIndex((t) => t.id === item.tier);
      const nextIndex = (currentIndex + 1) % TIERS.length;
      const nextTier = TIERS[nextIndex].id;

      toast.success(t("toast.moved_to_tier", { tier: nextTier }));

      return prev.map((i) =>
        i.id === itemId ? { ...i, tier: nextTier } : i
      );
    });
  }, [t]);

  // Mobile quick menu
  const handleItemClick = useCallback((itemId: string, e: React.MouseEvent) => {
    if (!isMobile) return;
    
    e.preventDefault();
    setSelectedItem(itemId);
    setShowMobileMenu(true);
  }, [isMobile]);

  const handleMoveToTier = useCallback((tierId: string) => {
    if (!selectedItem) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === selectedItem ? { ...item, tier: tierId } : item
      )
    );
    
    toast.success(t("toast.moved_to_tier", { tier: tierId }));
    setShowMobileMenu(false);
    setSelectedItem(null);
  }, [selectedItem, t]);

  // Get items for a specific tier
  const getItemsForTier = useCallback(
    (tierId: string) => {
      return items.filter((item) => item.tier === tierId);
    },
    [items]
  );

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Text Input Section */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder={t("input.placeholder")}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            maxLength={50}
            className="w-full h-12 text-lg"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {t("input.hint")}
          </p>
        </div>
        <Button
          size="lg"
          onClick={handleAddItem}
          className="gap-2 h-12"
        >
          <Plus className="w-4 h-4" />
          {t("buttons.add_text")}
        </Button>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-end gap-3 mb-6">
        <Button
          variant="outline"
          size="lg"
          onClick={handleSaveImage}
          className="gap-2"
          disabled={isExporting || items.length === 0}
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {isExporting ? t("buttons.exporting") : t("buttons.save_image")}
        </Button>
        <Button
          variant="destructive"
          size="lg"
          onClick={handleClearAll}
          className="gap-2"
          disabled={items.length === 0}
        >
          <Trash2 className="w-4 h-4" />
          {t("buttons.delete_all")}
        </Button>
      </div>

      {/* Tier List Container */}
      <div
        ref={tierListRef}
        className="rounded-lg overflow-hidden shadow-2xl relative"
        style={{ 
          backgroundColor: isDarkTheme ? "#1a1a1a" : "#ffffff",
          border: `1px solid ${isDarkTheme ? "#2d2d2d" : "#e5e7eb"}`
        }}
      >
        {TIERS.map((tier) => {
          const tierItems = getItemsForTier(tier.id);
          const isDropTarget = dropZone === tier.id;

          return (
            <div
              key={tier.id}
              className="flex last:border-b-0"
              style={{
                borderBottom: `1px solid ${isDarkTheme ? "#2d2d2d" : "#e5e7eb"}`
              }}
              onDragOver={handleDragOver}
              onDragEnter={() => handleDragEnter(tier.id)}
              onDragLeave={handleDragLeave}
              onDrop={() => handleDrop(tier.id)}
            >
              {/* Tier Label */}
              <div
                className="w-20 sm:w-24 flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: tier.color }}
              >
                <span
                  className="text-4xl sm:text-5xl font-bold drop-shadow-lg"
                  style={{ color: "#ffffff" }}
                >
                  {tier.label}
                </span>
              </div>

              {/* Tier Content Area */}
              <div
                className="flex-1 min-h-[120px] sm:min-h-[100px] p-2 sm:p-3 transition-all duration-200"
                style={{ 
                  backgroundColor: isDropTarget 
                    ? (isDarkTheme ? "#333333" : "#e5e7eb")
                    : (isDarkTheme ? "#262626" : "#f9fafb"),
                  border: isDropTarget ? `2px dashed ${isDarkTheme ? "#666666" : "#9ca3af"}` : "none"
                }}
              >
                {/* Empty state */}
                {tierItems.length === 0 && (
                  <div
                    className="flex flex-col items-center justify-center h-full text-sm gap-2"
                    style={{ color: isDarkTheme ? "#9ca3af" : "#6b7280" }}
                  >
                    {items.length === 0 && tier.id === "D" ? (
                      <>
                        <Plus className="w-8 h-8 opacity-50" />
                        <p className="font-medium">{t("empty_state.title")}</p>
                        <p className="text-xs">{t("empty_state.subtitle")}</p>
                      </>
                    ) : (
                      <>
                        {isDropTarget ? (
                          <p className="font-medium text-green-400">{t("empty_state.drop_here")}</p>
                        ) : (
                          <p>
                            {isMobile 
                              ? t("empty_state.tap_to_move")
                              : t("empty_state.drag_here")}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {tierItems.map((item) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={() => handleDragStart(item.id)}
                      onDragEnd={handleDragEnd}
                      onDoubleClick={() => handleDoubleClick(item.id)}
                      onClick={(e) => handleItemClick(item.id, e)}
                      className="relative group cursor-move hover:scale-105 transition-transform"
                      style={{
                        opacity: draggedItem === item.id ? 0.5 : 1,
                      }}
                    >
                      {/* Text Item */}
                      <div
                        className="px-4 py-2 rounded font-medium text-sm sm:text-base"
                        style={{ 
                          backgroundColor: isDarkTheme ? "#404040" : "#ffffff",
                          color: isDarkTheme ? "#e5e7eb" : "#1f2937",
                          border: `2px solid ${
                            selectedItem === item.id 
                              ? "#3b82f6" 
                              : (isDarkTheme ? "#525252" : "#d1d5db")
                          }`,
                          minWidth: "80px",
                          maxWidth: "200px",
                          wordBreak: "break-word"
                        }}
                      >
                        {item.text}
                      </div>

                      {/* Remove Button - Desktop only */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveItem(item.id);
                        }}
                        className="absolute -top-2 -right-2 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hidden sm:block"
                        style={{ backgroundColor: "#ef4444" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#dc2626";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#ef4444";
                        }}
                        title={t("buttons.remove_item")}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* Watermark */}
        <div 
          className="w-full py-2 px-4 flex items-center justify-center sm:justify-end gap-2"
          style={{
            backgroundColor: isDarkTheme ? "#0a0a0a" : "#f3f4f6",
            borderTop: `1px solid ${isDarkTheme ? "#2d2d2d" : "#d1d5db"}`
          }}
        >
          <span 
            className="text-xs font-medium tracking-wide"
            style={{ color: isDarkTheme ? "#9ca3af" : "#6b7280" }}
          >
            {t("watermark.made_by")}
          </span>
          <span 
            className="text-xs font-bold tracking-wide text-red-500"
            style={{ 
              textShadow: "0 0 10px rgba(239, 68, 68, 0.2)"
            }}
          >
            tierlist-maker.com
          </span>
        </div>
      </div>

      {/* Mobile Quick Menu */}
      {showMobileMenu && selectedItem && (
        <div
          className="fixed inset-0 bg-black/50 flex items-end sm:hidden z-50"
          onClick={() => {
            setShowMobileMenu(false);
            setSelectedItem(null);
          }}
        >
          <div
            className="bg-gray-900 w-full rounded-t-2xl p-6 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white font-semibold text-lg mb-4">{t("mobile_menu.title")}</h3>
            <div className="grid grid-cols-5 gap-2">
              {TIERS.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => handleMoveToTier(tier.id)}
                  className="p-4 rounded-lg text-white font-bold text-2xl transition-transform active:scale-95"
                  style={{ backgroundColor: tier.color }}
                >
                  {tier.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                if (selectedItem) handleRemoveItem(selectedItem);
              }}
              className="w-full p-3 rounded-lg text-white font-medium"
              style={{ backgroundColor: "#ef4444" }}
            >
              {t("mobile_menu.delete_item")}
            </button>
            <button
              onClick={() => {
                setShowMobileMenu(false);
                setSelectedItem(null);
              }}
              className="w-full p-3 rounded-lg bg-gray-700 text-white font-medium"
            >
              {t("mobile_menu.cancel")}
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 text-center text-sm text-muted-foreground space-y-1">
        <p className="hidden sm:block">
          💡 <strong>{t("instructions.desktop")}</strong>
        </p>
        <p className="sm:hidden">
          💡 <strong>{t("instructions.mobile")}</strong>
        </p>
        {items.length > 0 && (
          <p className="text-xs text-green-600">
            ✓ {t("instructions.auto_saved")}
          </p>
        )}
      </div>
    </div>
  );
}

