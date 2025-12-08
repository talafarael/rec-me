import { IInputForm } from "@/shared/types/input-form";
import { IGenerateUrl } from "../../types/generate-llink";

export const generateLinksFormData: IInputForm<IGenerateUrl>[] = [
  {
    name: "baseUrl",
    field: "Base url",
    type: "default",
  },
  {
    name: "pixel",
    field: "Pixel",
    type: "default",
  },
  {
    name: "sub1",
    field: "Sub1",
    type: "default",
  },
  {
    name: "sub2",
    field: "Sub2",
    type: "default",
  },
  {
    name: "sub3",
    field: "Sub3",
    type: "default",
  },
  {
    name: "sub4",
    field: "Sub4",
    type: "default",
  },
  // {
  //   name: "utm_source",
  //   field: "UTM Source",
  //   type: "default",
  // },
  // {
  //   name: "utm_medium",
  //   field: "UTM Medium",
  //   type: "default",
  // },
  // {
  //   name: "utm_campaign",
  //   field: "UTM Campaign",
  //   type: "default",
  // },
  // {
  //   name: "utm_content",
  //   field: "UTM Content",
  //   type: "default",
  // },
  // {
  //   name: "utm_term",
  //   field: "UTM Term",
  //   type: "default",
  // },
];
