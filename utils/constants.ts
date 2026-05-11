import {
	AirVent,
	Printer,
	Wifi,
	VolumeX,
	CookingPot,
	Users,
} from "lucide-react";

export const FEATURE_LABELS: Record<string, string> = {
	wifi: "WiFi",
	quiet: "Quiet Zone",
	ac: "Air Conditioning",
	"meeting-room": "Meeting Room",
	printing: "Printing",
	kitchen: "Kitchen",
};

export const FEATURES = {
	wifi: {
		label: "WiFi",
		icon: Wifi,
		description: "Fast and reliable internet",
	},

	quiet: {
		label: "Quiet Zone",
		icon: VolumeX,
		description: "Perfect for studying and focus",
	},

	ac: {
		label: "Air Conditioning",
		icon: AirVent,
		description: "Comfortable climate all day",
	},

	"meeting-room": {
		label: "Meeting Room",
		icon: Users,
		description: "Private collaborative spaces",
	},

	printing: {
		label: "Printing",
		icon: Printer,
		description: "Printers and office essentials",
	},

	kitchen: {
		label: "Kitchen",
		icon: CookingPot,
		description: "Coffee and refreshments available",
	},
};
