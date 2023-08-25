import { StyleSheet } from "react-native";
import color from "../../commons/variable/color";
import flex from "../../commons/variable/flex";
import space from "../../commons/variable/space";
import { Dimensions } from "react-native";

const dimensions = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  };
  
const styles = StyleSheet.create({
    fullscreen: {
        width: dimensions.width,
        height: dimensions.height,
    },

    wrapper: {
        flex: 1,

    },
    topHome: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
    },
    avatar: {
        flex: 1
    },
    selectImage: {
        flex: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 4,

    },
    selectImageInner: {
        backgroundColor: 'transparent',
        alignItems: "center",
    },
    selectImageText: {

    },
    contentHome: {
        flex: 1
    },
    emptyContent: {
        flexDirection: flex.row,
        justifyContent: flex.center,
        alignItems: flex.center,
        paddingVertical: space.sp20
    },
    warningIcon: {
        marginRight: space.sp5,
        color: color.red
    },
    emptyText: {
        color: color.red,
        fontSize: space.sp20

    }
})

export default styles;