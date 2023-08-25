import { StyleSheet } from "react-native";
import color from "../../commons/variable/color";
import flex from "../../commons/variable/flex";

const styles = StyleSheet.create({
    wrapLogo: {
        flexDirection: flex.row, 
        justifyContent: flex.center,
        backgroundColor: color.white
    },
    logo: {
        height: 70, 
        width: "50%", 
        objectFit: "cover",
    }
})

export default styles;