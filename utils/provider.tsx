"use client";
import React, { PropsWithChildren } from "react";
import { SWRConfig } from "swr";
export default function Provider({ children }: PropsWithChildren) {
  return <SWRConfig>{children}</SWRConfig>;
}
