import React from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { CheckCircle } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

type RootStackParamList = {
  OrderSuccess: { orderId: string };
  Orders: undefined;
  Tabs: undefined;
};

const OrderSuccessScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, "OrderSuccess">>();
  const orderId = route.params?.orderId;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <CheckCircle size={40} color="#16A34A" />
        </View>
        <Text style={styles.title}>Order Placed!</Text>
        <Text style={styles.sub}>Your order has been placed successfully</Text>
        <Text style={styles.orderId}>Order ID: <Text style={styles.orderIdVal}>{orderId}</Text></Text>
        <View style={styles.btnGroup}>
          <TouchableOpacity onPress={() => navigation.navigate("Orders")} activeOpacity={0.88}>
            <LinearGradient colors={["#E11D48", "#9F1239"]} style={styles.btn}>
              <Text style={styles.btnText}>View Orders</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Tabs")} style={styles.outlineBtn}>
            <Text style={styles.outlineBtnText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: "#FFFFFF" },
  container:     { flex: 1, alignItems: "center", justifyContent: "center", padding: 32, gap: 10 },
  iconWrapper:   { width: 80, height: 80, borderRadius: 40, backgroundColor: "rgba(22,163,74,0.10)", alignItems: "center", justifyContent: "center", marginBottom: 8 },
  title:         { fontSize: 26, fontWeight: "800", color: "#111111" },
  sub:           { fontSize: 13, color: "#6B7280", textAlign: "center" },
  orderId:       { fontSize: 12, color: "#9CA3AF", marginTop: 4 },
  orderIdVal:    { fontWeight: "700", color: "#333333" },
  btnGroup:      { marginTop: 24, width: "80%", gap: 14 },
  btn:           { height: 52, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  btnText:       { fontSize: 15, fontWeight: "800", color: "#FFFFFF" },
  outlineBtn:    { height: 52, borderRadius: 14, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#E5E5E5" },
  outlineBtnText:{ fontSize: 14, fontWeight: "700", color: "#333333" },
});