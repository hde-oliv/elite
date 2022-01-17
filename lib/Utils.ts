export const convertToSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/ +/g, "-")
    .replace(/[^\w-]+/g, "");
};

export const handleToast = (res: boolean, toast: any) => {
  if (res) {
    toast({
      title: "Success",
      status: "success",
      position: "bottom-right",
      isClosable: true,
    });
  } else {
    toast({
      title: "Error",
      status: "error",
      position: "bottom-right",
      isClosable: true,
    });
  }
};
