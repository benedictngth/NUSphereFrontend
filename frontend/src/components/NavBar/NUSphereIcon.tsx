/// <reference types="vite-plugin-svgr/client" />

import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

import {ReactComponent as NUSphere} from "@/assets/NUSphere.svg"


const NUSphereIconComponent: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon component={NUSphere}  inheritViewBox {...props} />
  );
}

export default NUSphereIconComponent;