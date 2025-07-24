import tw from "twrnc";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function TabTwoScreen() {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-2xl font-bold`}>Tab Two</Text>
      <View style={tw`h-1 w-full bg-gray-300`} />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}
