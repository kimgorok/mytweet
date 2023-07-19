import React from "react";
import { cls } from "../../lib/client/utils";
import { useRouter } from "next/router";
interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  children: React.ReactNode;
}

export default function Layout({ title, canGoBack }: LayoutProps) {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <div>
      <div>
        {canGoBack ? <button onClick={onClick}></button> : null}
        {title ? (
          <span className={cls(canGoBack ? "mx-auto" : "", "")}>{title}</span>
        ) : null}
      </div>
    </div>
  );
}
