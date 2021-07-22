import urls from "@/constants/urls";


export default function RandomImage() {
  const id = Math.floor(Math.random() * 599) + 1;
  return `${urls.PICSUM}/id/${id}/200`;
}
