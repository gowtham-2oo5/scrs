import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Home } from "lucide-react";

const Sidebar = ({ className, sidebarItems, singleItems }) => {
  const [openItem, setOpenItem] = useState(null); // Track which accordion item is open
  const [selectedSubItem, setSelectedSubItem] = useState(""); // Track selected sub item
  const location = useLocation(); // Get the current location

  const handleAccordionToggle = (index) => {
    setOpenItem(openItem === index ? null : index); // Toggle the opened state
  };

  const handleSubItemClick = (path) => {
    setSelectedSubItem(path); // Set the selected sub item
  };

  // Effect to collapse all accordions when navigating to root path
  useEffect(() => {
    if (location.pathname === "/admin") {
      setOpenItem(null); // Collapse all accordions
      setSelectedSubItem(""); // Reset selected sub item if desired
    }
  }, [location.pathname]);

  return (
    <Card className={`h-full rounded-none border-r ${className}`}>
      <CardHeader>
        <CardTitle
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link to="/admin">
            <Home />
          </Link>
        </CardTitle>
      </CardHeader>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <CardContent>
          <Accordion
            type="single"
            collapsible
            value={openItem}
            onValueChange={setOpenItem}
            className="w-full"
          >
            {sidebarItems.map((item, index) => {
              // console.log("Rendering sidebar item:", item);
              return (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger
                    onClick={() => handleAccordionToggle(index)}
                  >
                    <div className="flex items-center gap-2">
                      {React.createElement(item.icon, { className: "h-4 w-4" })}
                      {item.label}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col pl-6 space-y-2">
                      {Object.entries(item.items).map(
                        ([subItemLabel, subItemPath], subIndex) => (
                          <Button
                            key={subIndex}
                            variant="ghost"
                            className={`justify-start gap-2 ${
                              selectedSubItem === subItemPath ? "underline" : ""
                            }`}
                            onClick={() => handleSubItemClick(subItemPath)}
                            asChild
                          >
                            <Link to={subItemPath}>{subItemLabel}</Link>
                          </Button>
                        )
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
          <div className="mt-4 space-y-2">
            {singleItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="justify-start w-full gap-2"
                asChild
              >
                <Link to={item.path}>
                  {React.createElement(item.icon, { className: "h-4 w-4" })}
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default Sidebar;
