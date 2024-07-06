"use client";

import { useEffect, useState } from "react";

import { getTunnellers } from "@/utils/database/getEndpoint";
import { Menu } from "./Menu";

export async function MenuContainer() {
  const [tunnellers, setTunnellers] = useState([]);

  useEffect(() => {
    getTunnellers().then((tunnellers) => {
      setTunnellers(tunnellers);
    });
  }, []);

  return <Menu tunnellers={tunnellers} />;
}
