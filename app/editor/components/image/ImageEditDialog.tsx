import ImageEditBlock from "@/app/editor/components/image/ImageEditBlock";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";
import type { Editor } from "@tiptap/react";
import { ImageIcon } from "lucide-react";
import { useState } from "react";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogDescription,
//     DialogTitle,
//     DialogTrigger
// } from '@/components/ui/dialog'
// import { ImageEditBlock } from './image-edit-block'

interface ImageEditDialogProps {
    editor: Editor;
}

export const ImageEditDialog = ({ editor }: ImageEditDialogProps) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Popover
                isOpen={open}
                onOpenChange={(open) => setOpen(open)}
                placement="bottom"
            >
                <PopoverTrigger>
                    <Button
                        isDisabled={editor.isActive("image")}
                        aria-label="Image"
                        size={"sm"}
                        onClick={() => setOpen(true)}
                    >
                        <ImageIcon className="size-5" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Card>
                        <CardHeader>
                            <h1>Select image</h1>
                            <p className="sr-only">
                                Upload an image from your computer
                            </p>
                        </CardHeader>
                        <CardBody>
                            <ImageEditBlock
                                editor={editor}
                                close={() => setOpen(false)}
                            />
                        </CardBody>
                    </Card>
                </PopoverContent>
            </Popover>
        </>
    );
};
