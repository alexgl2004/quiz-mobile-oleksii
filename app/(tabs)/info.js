import { Text, ScrollView } from "react-native";
import { globalStyles } from "../../styles/global";
import { Typography } from "../../components/Typography";

export default function InfoPage() {

    const header_var = (<Typography variant="heading">Information</Typography>);

    return (
        <ScrollView style={globalStyles.container}>
            {header_var}
            <Text style={globalStyles.p}>
              🎉 Don't miss out on our exclusive 10% SALE! 🎉
            </Text>
            <Text style={globalStyles.p}>
              You can make this by 3 small steps:
            </Text>
            <Text style={globalStyles.p}>
              - Register on the our site
            </Text>
            <Text style={globalStyles.p}>
              - Login in this App
            </Text>
            <Text style={globalStyles.p}>
              - SCAN Promocode! 🎉
            </Text>
            <Text style={globalStyles.p}>
              For a limited time only, enjoy incredible savings on a wide range of products at our store! Whether you're looking for fashion essentials, electronics, home decor, or gifts for your loved ones, we've got you covered.
              </Text>
            <Text style={globalStyles.p}>
              🛍️ Take advantage of this amazing offer and upgrade your wardrobe, spruce up your living space, or treat yourself to the latest gadgets without breaking the bank.
              </Text>
            <Text style={globalStyles.p}>
              🕒 But hurry, this promotion won't last forever! Visit us today and indulge in savings galore. Don't let this opportunity slip away – shop now and save big!
            </Text>

        </ScrollView>
      )

}
/*
            <Link asChild style={globalStyles.link} href="actors">
                <Button color={COLORS.accent} title="Select Author" />
            </Link>
*/            
