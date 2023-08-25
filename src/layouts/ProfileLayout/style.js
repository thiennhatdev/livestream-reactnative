import { StyleSheet } from "react-native";
import color from "../../commons/variable/color";
import space from "../../commons/variable/space";
import flex from "../../commons/variable/flex";


const styles = StyleSheet.create({
    profileLayout: {
        padding: space.sp10,
        flex: 1
    },
    wrapBack: {
        flexDirection: flex.row,
        width: "100%"
    },
    backText: {
        marginLeft: space.sp10,
        color: color.blue
    }
})

export default styles;