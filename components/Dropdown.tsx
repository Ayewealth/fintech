import React from "react";
import { View, Text } from "react-native";
import * as DropdownMenu from "zeego/dropdown-menu";
import RoundButton from "./RoundButton";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

const Dropdown = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <RoundButton icon={"ellipsis-horizontal"} text={"More"} />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item key="statement">
          <DropdownMenu.ItemTitle>Statement</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon
            ios={{
              name: "list.bullet.rectangle.fill",
              pointSize: 24,
            }}
            androidIconName="list-alt"
          >
            <FontAwesome name="list-alt" size={24} color="black" />
          </DropdownMenu.ItemIcon>
        </DropdownMenu.Item>

        <DropdownMenu.Item key="converter">
          <DropdownMenu.ItemTitle>Converter</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon
            ios={{
              name: "coloncurrencysign.arrow.circlepath",
              pointSize: 24,
            }}
            androidIconName="currency-exchange"
          >
            <MaterialIcons name="currency-exchange" size={24} color="black" />
          </DropdownMenu.ItemIcon>
        </DropdownMenu.Item>

        <DropdownMenu.Item key="background">
          <DropdownMenu.ItemTitle>Background</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon
            ios={{
              name: "photo.fill",
              pointSize: 24,
            }}
            androidIconName="photo-size-select-actual"
          >
            <MaterialIcons
              name="photo-size-select-actual"
              size={24}
              color="black"
            />
          </DropdownMenu.ItemIcon>
        </DropdownMenu.Item>

        <DropdownMenu.Item key="account">
          <DropdownMenu.ItemTitle>Add new account</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon
            ios={{
              name: "plus.rectangle.on.folder.fill",
              pointSize: 24,
            }}
            androidIconName="folder-open"
          >
            <Ionicons name="folder-open" size={24} color="black" />
          </DropdownMenu.ItemIcon>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
