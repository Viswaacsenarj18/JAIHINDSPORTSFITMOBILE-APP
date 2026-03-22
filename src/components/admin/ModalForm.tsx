import React, { ReactNode } from "react";
import {
  View, Text, TouchableOpacity, Modal,
  ScrollView, StyleSheet, KeyboardAvoidingView, Platform,
} from "react-native";
import { X } from "lucide-react-native";

interface ModalFormProps {
  open:     boolean;
  onClose:  () => void;
  title:    string;
  children: ReactNode;
}

const ModalForm = ({ open, onClose, title, children }: ModalFormProps) => (
  <Modal
    visible={open}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    {/* Backdrop */}
    <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

    {/* Content */}
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.center}
      pointerEvents="box-none"
    >
      <View style={styles.modal}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeBtn}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          >
            <X size={18} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Body */}
        <ScrollView
          contentContainerStyle={styles.body}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  </Modal>
);

export default ModalForm;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modal: {
    width: "100%",
    maxHeight: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.20,
    shadowRadius: 16,
    elevation: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E5E5",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111111",
  },
  closeBtn: {
    width: 30, height: 30,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    padding: 20,
  },
});