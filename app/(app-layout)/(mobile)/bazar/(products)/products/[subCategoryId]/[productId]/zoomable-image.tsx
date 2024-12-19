"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";

interface ZoomableImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function ZoomableImage({ src, alt, width, height }: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="cursor-pointer max-w-[auto] w-full aspect-[1/1] object-center object-contain rounded-lg"
        onClick={() => setIsOpen(true)}
      />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-sm md:max-w-[60vw] h-[60vh] md:h-[85vh] rounded-lg overflow-hidden p-0 bg-white mx-auto">
          <TransformWrapper
            initialScale={1}
            minScale={1}
            maxScale={30}
            centerOnInit={true}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <div className="relative w-full h-[55vh] md:h-[80vh]">
                <TransformComponent
                  wrapperClass="w-full h-full"
                  contentClass="w-full h-full"
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={3000}
                    height={height}
                    className="mx-auto h-[60vh] md:h-[85vh] cursor-pointer max-w-[auto] aspect-[1/1] object-center object-contain"
                  />
                </TransformComponent>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/60 p-3 rounded-full z-10 shadow-lg">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => zoomOut()}
                    className="bg-white/90 hover:bg-white rounded-full"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => resetTransform()}
                    className="bg-white/90 hover:bg-white rounded-full"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => zoomIn()}
                    className="bg-white/90 hover:bg-white rounded-full"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </TransformWrapper>
        </DialogContent>
      </Dialog>
    </>
  );
}
