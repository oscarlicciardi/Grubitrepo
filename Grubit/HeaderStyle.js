import { StyleSheet } from "react-native";
const HeaderStyle = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: 180,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 50,
  },
  firstLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    fontFamily: "Montserrat-Italic-VariableFont_wght",
    fontWeight: "normal",
  },
  secondLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Montserrat-Italic-VariableFont_wght",
    paddingVertical: 5,
  },
  secondLineAlignment: {
    alignItems: "center",
  },
  logo: {
    width: 105,
    height: 50,
    marginRight: 10,
  },
  tabIcon: {
    marginRight: 5,
  },
  title: {
    color: "light-blue",
    fontSize: 20,
    fontFamily: "Montserrat-Italic-VariableFont_wght",
    fontWeight: "normal",
  },
  subtitle: {
    color: "light-blue",
    fontSize: 10,
    fontFamily: "Montserrat-Italic-VariableFont_wght",
    fontWeight: "normal",
  },
});

export default HeaderStyle;
