import React from "react";
import { IProduct } from "../app/page";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "./ui/item";
import { Button } from "./ui/button";

interface IListItem extends IProduct {
  handleAddItem: (value: number) => void;
  removeItem: (value: number) => void;
}

const ListItem: React.FC<IListItem> = ({
  id,
  name,
  description,
  handleAddItem,
  removeItem,
}) => {
  return (
    <Item className="w-100" variant="outline">
      <ItemActions>
        <Button
          className="text-lg"
          variant="ghost"
          size="sm"
          onClick={() => removeItem(id)}
        >
          ✖
        </Button>
      </ItemActions>
      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm" onClick={() => handleAddItem(id)}>
          Add
        </Button>
      </ItemActions>
    </Item>
  );
};

export default ListItem;
