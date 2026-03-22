import React from "react";
import {
  View, Text, ScrollView, StyleSheet, Dimensions,
} from "react-native";
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react-native";
import DashboardCard from "../../components/admin/DashboardCard";
import StatusBadge   from "../../components/admin/StatusBadge";
import {
  adminOrders,
  monthlySalesData,
  ordersOverviewData,
  categoryPerformanceData,
} from "../../data/adminMockData";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CHART_WIDTH  = SCREEN_WIDTH - 64;
const COLORS = ["#F97316","#E11D48","#16A34A","#D97706","#6366F1","#6B7280"];

// ─── Pure-RN Bar Chart ────────────────────────────────────────────────────────
const BarChartSimple = ({ data, labels, color = "#E11D48" }: { data: number[]; labels: string[]; color?: string }) => {
  const max = Math.max(...data) || 1;
  const BAR_H = 120;
  return (
    <View style={bc.row}>
      {data.map((val, idx) => (
        <View key={idx} style={bc.col}>
          <Text style={bc.val}>{val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}</Text>
          <View style={[bc.track, { height: BAR_H }]}>
            <View style={[bc.fill, { height: Math.max(BAR_H * (val / max), 4), backgroundColor: color }]} />
          </View>
          <Text style={bc.lbl}>{labels[idx]}</Text>
        </View>
      ))}
    </View>
  );
};
const bc = StyleSheet.create({
  row:   { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingTop: 8 },
  col:   { flex: 1, alignItems: "center", gap: 3 },
  track: { width: "55%", backgroundColor: "#F3F4F6", borderRadius: 6, justifyContent: "flex-end", overflow: "hidden" },
  fill:  { width: "100%", borderRadius: 6 },
  val:   { fontSize: 8, color: "#9CA3AF", fontWeight: "600" },
  lbl:   { fontSize: 9, color: "#6B7280", marginTop: 3 },
});

// ─── Pure-RN Line Chart ───────────────────────────────────────────────────────
const LineChartSimple = ({ datasets, labels, legend }: { datasets: { data: number[]; color: string }[]; labels: string[]; legend: string[] }) => {
  const all = datasets.flatMap((d) => d.data);
  const max = Math.max(...all) || 1;
  const min = Math.min(...all);
  const range = max - min || 1;
  const H = 110;
  const W = CHART_WIDTH - 32;
  const step = W / (labels.length - 1);
  const getY = (v: number) => H - ((v - min) / range) * H;

  return (
    <View>
      <View style={lc.legend}>
        {legend.map((l, i) => (
          <View key={l} style={lc.legendItem}>
            <View style={[lc.dot2, { backgroundColor: datasets[i]?.color }]} />
            <Text style={lc.legendTxt}>{l}</Text>
          </View>
        ))}
      </View>
      <View style={{ height: H + 20, width: W }}>
        {[0, 0.33, 0.66, 1].map((f) => (
          <View key={f} style={[lc.grid, { top: H * f }]} />
        ))}
        {datasets.map((ds, di) =>
          ds.data.map((val, i) => {
            const x1 = i * step;
            const y1 = getY(val);
            const next = ds.data[i + 1];
            if (next === undefined) return (
              <View key={`${di}-${i}`} style={[lc.dot, { left: x1 - 4, top: y1 - 4, backgroundColor: ds.color }]} />
            );
            const x2 = (i + 1) * step;
            const y2 = getY(next);
            const dx = x2 - x1; const dy = y2 - y1;
            const len = Math.sqrt(dx * dx + dy * dy);
            const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
            return (
              <React.Fragment key={`${di}-${i}`}>
                <View style={[lc.seg, { left: x1, top: y1, width: len, borderTopColor: ds.color, transform: [{ rotate: `${angle}deg` }] }]} />
                <View style={[lc.dot, { left: x1 - 4, top: y1 - 4, backgroundColor: ds.color }]} />
              </React.Fragment>
            );
          })
        )}
        {labels.map((l, i) => (
          <Text key={i} style={[lc.xLbl, { left: i * step - 10, top: H + 2 }]}>{l}</Text>
        ))}
      </View>
    </View>
  );
};
const lc = StyleSheet.create({
  legend:     { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 10 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  dot2:       { width: 8, height: 8, borderRadius: 4 },
  legendTxt:  { fontSize: 11, color: "#6B7280" },
  grid:       { position: "absolute", left: 0, right: 0, height: StyleSheet.hairlineWidth, backgroundColor: "#F0F0F0" },
  seg:        { position: "absolute", height: 2, transformOrigin: "left center" as any },
  dot:        { position: "absolute", width: 8, height: 8, borderRadius: 4, borderWidth: 2, borderColor: "#FFFFFF" },
  xLbl:       { position: "absolute", fontSize: 9, color: "#9CA3AF", width: 24, textAlign: "center" },
});

// ─── Page ─────────────────────────────────────────────────────────────────────
const AdminDashboardPage = () => (
  <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <View style={styles.statsGrid}>
      {[
        { title: "Products", value: "12",    icon: Package,      trend: "+8%",  trendUp: true },
        { title: "Users",    value: "156",   icon: Users,        trend: "+12%", trendUp: true },
        { title: "Orders",   value: "89",    icon: ShoppingCart, trend: "+5%",  trendUp: true },
        { title: "Revenue",  value: "₹3.9L", icon: DollarSign,   trend: "+15%", trendUp: true },
      ].map((c) => (
        <View key={c.title} style={styles.statItem}><DashboardCard {...c} /></View>
      ))}
    </View>

    <View style={styles.chartCard}>
      <Text style={styles.chartTitle}>Monthly Sales (₹)</Text>
      <BarChartSimple data={monthlySalesData.map((d) => d.sales)} labels={monthlySalesData.map((d) => d.month)} color="#E11D48" />
    </View>

    <View style={styles.chartCard}>
      <Text style={styles.chartTitle}>Orders Overview</Text>
      <LineChartSimple
        datasets={[
          { data: ordersOverviewData.map((d) => d.delivered),  color: "#16A34A" },
          { data: ordersOverviewData.map((d) => d.processing), color: "#E11D48" },
          { data: ordersOverviewData.map((d) => d.pending),    color: "#D97706" },
        ]}
        labels={ordersOverviewData.map((d) => d.month)}
        legend={["Delivered", "Processing", "Pending"]}
      />
    </View>

    <View style={styles.chartCard}>
      <Text style={styles.chartTitle}>Category Performance</Text>
      {(() => {
        const max = Math.max(...categoryPerformanceData.map((c) => c.sales));
        return categoryPerformanceData.map((cat, idx) => (
          <View key={cat.category} style={styles.catRow}>
            <View style={[styles.catDot, { backgroundColor: COLORS[idx % COLORS.length] }]} />
            <Text style={styles.catName}>{cat.category}</Text>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${(cat.sales / max) * 100}%` as any, backgroundColor: COLORS[idx % COLORS.length] }]} />
            </View>
            <Text style={styles.catValue}>₹{(cat.sales / 1000).toFixed(0)}K</Text>
          </View>
        ));
      })()}
    </View>

    <View style={styles.tableCard}>
      <Text style={styles.tableTitle}>Recent Orders</Text>
      <View style={[styles.tableRow, styles.tableHeader]}>
        <Text style={[styles.col, styles.colId,     styles.hdr]}>Order</Text>
        <Text style={[styles.col, styles.colName,   styles.hdr]}>Customer</Text>
        <Text style={[styles.col, styles.colAmt,    styles.hdr]}>Amount</Text>
        <Text style={[styles.col, styles.colStatus, styles.hdr]}>Status</Text>
      </View>
      {adminOrders.map((order, idx) => (
        <View key={order.id} style={[styles.tableRow, idx < adminOrders.length - 1 && styles.rowBorder]}>
          <Text style={[styles.col, styles.colId,   styles.cell]}>{order.id}</Text>
          <Text style={[styles.col, styles.colName, styles.cell]} numberOfLines={1}>{order.customerName}</Text>
          <Text style={[styles.col, styles.colAmt,  styles.cell]}>₹{order.amount.toLocaleString("en-IN")}</Text>
          <View style={[styles.col, styles.colStatus]}>
            <StatusBadge status={order.orderStatus} />
          </View>
        </View>
      ))}
    </View>

    <View style={{ height: 16 }} />
  </ScrollView>
);

export default AdminDashboardPage;

const styles = StyleSheet.create({
  content:    { padding: 16, gap: 16 },
  statsGrid:  { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  statItem:   { width: "48%" },
  chartCard:  { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 3 },
  chartTitle: { fontSize: 13, fontWeight: "700", color: "#111111", marginBottom: 12 },
  catRow:     { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  catDot:     { width: 10, height: 10, borderRadius: 5 },
  catName:    { fontSize: 12, color: "#333333", width: 70 },
  barTrack:   { flex: 1, height: 8, backgroundColor: "#F3F4F6", borderRadius: 4, overflow: "hidden" },
  barFill:    { height: "100%", borderRadius: 4 },
  catValue:   { fontSize: 12, fontWeight: "700", color: "#111111", width: 44, textAlign: "right" },
  tableCard:  { backgroundColor: "#FFFFFF", borderRadius: 16, overflow: "hidden", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 3 },
  tableTitle: { fontSize: 13, fontWeight: "700", color: "#111111", padding: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#E5E5E5" },
  tableRow:   { flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 10 },
  tableHeader:{ backgroundColor: "#F8F8F8" },
  rowBorder:  { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#F0F0F0" },
  col:        { paddingHorizontal: 2 },
  colId:      { width: 68 },
  colName:    { flex: 1 },
  colAmt:     { width: 72 },
  colStatus:  { width: 82 },
  hdr:        { fontSize: 10, fontWeight: "700", color: "#9CA3AF", textTransform: "uppercase" },
  cell:       { fontSize: 12, color: "#333333" },
});