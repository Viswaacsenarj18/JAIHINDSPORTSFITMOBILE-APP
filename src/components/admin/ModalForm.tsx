import React, { ReactNode } from "react";
import { View, Text, Modal, Pressable, ScrollView } from "react-native";
import { X } from "lucide-react-native";

interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const ModalForm = ({ open, onClose, title, children }: ModalFormProps) => {
  return (
    <Modal visible={open} transparent animationType="fade">
      
      {/* Overlay */}
      <View className="flex-1 bg-black/40 items-center justify-center p-4">
        
        {/* Close overlay click */}
        <Pressable
          className="absolute inset-0"
          onPress={onClose}
        />

        {/* Modal Content */}
        <View className="w-full max-w-lg bg-white rounded-xl border border-gray-200 p-6">
          
          {/* Header */}
          <View className="flex-row items-center justify-between mb-5">
            <Text className="text-lg font-semibold text-gray-900">
              {title}
            </Text>

            <Pressable
              onPress={onClose}
              className="p-1 rounded-md"
            >
              <X size={20} color="#6b7280" />
            </Pressable>
          </View>

          {/* Body */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>

        </View>
      </View>
    </Modal>
  );
};

export default ModalForm;