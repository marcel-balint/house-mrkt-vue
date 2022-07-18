import axios from "axios";
export default axios.create({
  baseURL: "https://api.intern.d-tt.nl/api/houses/",
  headers: {
    "X-Api-Key": "GJXtOHyT8QP352l6BZgxY41dmMojFW_N}",
  },
});
