import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

type SupabaseConfig = {
	url: string;
	serviceKey: string;
	options?: {
		auth: {
			persistSession: boolean;
		};
	};
};

const getSupabaseConfig = (): SupabaseConfig => {
	const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = process.env;

	if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
		throw new Error("Supabase credentials are not provided.");
	}

	return {
		url: SUPABASE_URL,
		serviceKey: SUPABASE_SERVICE_KEY,
		options: {
			auth: {
				persistSession: false,
			},
		},
	};
};

const supabase = createClient<Database>(getSupabaseConfig().url, getSupabaseConfig().serviceKey, getSupabaseConfig().options);

export default supabase;
