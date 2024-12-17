import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import ConfirmModal from "./ConfirmModal";

function MTMenuItem({ menuItems, Icon, userDetails }: { menuItems: any, Icon: any, userDetails: any }) {
  const handleMenuItemClick = (item: any, index: number) => {
    // Call the action function with the index value
    item.action(index);
  };
  return (
    <Menu placement="left-start">
      <MenuHandler>
        <IconButton placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
          variant="text">
          <Tooltip content="Action buttons">
            <Icon className="h-5 w-5 cursor-pointer" />
          </Tooltip>
        </IconButton>
      </MenuHandler>
      <MenuList placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
      >
        {menuItems.map((item: any, index: number) =>
          item.modal ? (
            <ConfirmModal
              key={index}
              title={`Are you sure you want to ${item.label.toLowerCase()}?`}
              handleConfirm={item.action(userDetails)}
            >
              <MenuItem className="flex justify-start items-center gap-1" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
              >
                {<item.Icon className="w-5 h-5" />}
                {item.label}
              </MenuItem>
            </ConfirmModal>
          ) : (
            <MenuItem
              placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}

              key={index}
              onClick={() => handleMenuItemClick(item, userDetails)}
              className="flex justify-start items-center gap-1"
            >
              {<item.Icon className="w-5 h-5" />}
              {item.label}
            </MenuItem>
          )
        )}
      </MenuList>
    </Menu>
  );
}

export default MTMenuItem;
