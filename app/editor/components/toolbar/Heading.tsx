import {
    Button,
    Listbox,
    ListboxItem,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";
import { Level } from "@tiptap/extension-heading";
import { useCurrentEditor } from "@tiptap/react";
import {
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    Heading4Icon,
    Heading5Icon,
    Heading6Icon,
    HeadingIcon,
} from "lucide-react";
import { ReactNode, useState } from "react";
import ActionButton from "../ActionButton";
import { ListboxWrapper } from "../ListboxWrapper";

const headingIconMapper: Record<string, ReactNode> = {
    H1: <Heading1Icon size={16} />,
    H2: <Heading2Icon size={16} />,
    H3: <Heading3Icon size={16} />,
    H4: <Heading4Icon size={16} />,
    H5: <Heading5Icon size={16} />,
    H6: <Heading6Icon size={16} />,
};

const Heading = () => {
    const [selectedKeys, setSelectedKeys] = useState(new Set<string>());

    const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }

    const handleHeadingChange = (level: Level) => {
        editor.chain().focus().setHeading({ level }).run();
    };
    return (
        <Popover
            classNames={{
                content: "px-1",
            }}
        >
            <PopoverTrigger>
                <Button
                    size={"sm"}
                    className={
                        editor.isActive("heading", {
                            level: editor.getAttributes("heading").level,
                        })
                            ? "text-primary-500"
                            : ""
                    }
                    isIconOnly
                >
                    <ActionButton
                        contentForMac={<p>Heading</p>}
                        contentForWindows={<p>Heading</p>}
                    >
                        {editor.getAttributes("heading").level ? (
                            headingIconMapper[
                                `H${editor.getAttributes("heading").level}`
                            ]
                        ) : (
                            <HeadingIcon size={16} />
                        )}
                    </ActionButton>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                {/* <ButtonGroup variant="flat"> */}
                <ListboxWrapper>
                    <Listbox
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                    >
                        {Object.keys(headingIconMapper).map((key, index) => (
                            <ListboxItem
                                key={key}
                                onPress={() =>
                                    handleHeadingChange((index + 1) as Level)
                                }
                                className={
                                    editor.isActive("heading", {
                                        level: index + 1,
                                    })
                                        ? "text-primary-500"
                                        : ""
                                }
                            >
                                {headingIconMapper[key]}
                            </ListboxItem>
                        ))}
                    </Listbox>
                </ListboxWrapper>
            </PopoverContent>
        </Popover>
    );
};

export default Heading;
