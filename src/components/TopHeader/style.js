import { StyleSheet } from "react-native";
import color from "../../commons/variable/color";
import flex from "../../commons/variable/flex";

const styles = StyleSheet.create({  
    iconWrap: {
        position: "relative",
    },
    badgesWrap: {
        position: "absolute",
        bottom: 13,
        left: 13,
        width: 17,
        height: 17,
        borderRadius: 50,
        backgroundColor: color.red,
        alignItems: flex.center,
        justifyContent: flex.center
    },
    iconBadges: {
        color: color.white,
        fontSize: 12,
        fontWeight: "900"
    }
})

export default styles;