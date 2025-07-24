import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import tw from "twrnc";

export default function TabOneScreen() {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-2xl font-bold`}>Tab One</Text>
      <View style={tw`h-1 w-full bg-gray-300`} />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}
