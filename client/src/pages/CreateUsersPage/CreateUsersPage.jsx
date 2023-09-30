import React from "react";
import CreateUsersChild from "./CreateUsersChild";

export function CreateUsersBackButtonPage() {
  return (
    <CreateUsersChild
      route={"instant-split"}
      alignment={"left"}
      buttonText={"back"}
    />
  );
}

export function CreateUsersNextButtonPage() {
  return (
    <CreateUsersChild
      route={"instant-split"}
      alignment={"right"}
      buttonText={"next"}
    />
  );
}
