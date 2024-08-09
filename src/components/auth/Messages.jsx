import { Text } from "react-native";

const InvalidText = ({ show, children }) => {
   if (show) {
       return <Text style={{padding:6, color: "red" }}>{children}</Text>;
   }
};

export {
   InvalidText,
}