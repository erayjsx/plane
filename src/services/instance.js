import axios from "axios";

export default axios.create({
  // API istekleri artık "/api" ile başlayacak, proxy ile yönlendirildi
  baseURL: "/api/public-flights",
  headers: {
    ResourceVersion: "v4",
    app_id: "c38d7741", // Schiphol API'den aldığım App ID
    app_key: "88aa27154cf05c46c82f59923e7e78df", // Schiphol API'den aldığım App Key
  },
});
