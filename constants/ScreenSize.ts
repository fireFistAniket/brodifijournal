import { Dimensions } from "react-native";

const vw = Dimensions.get("screen").width / 100;
const vh = Dimensions.get("screen").height / 100;

const vmax = vw > vh ? vw : vh;
const vmin = vw > vh ? vh : vw;

export { vh, vw, vmax, vmin };
