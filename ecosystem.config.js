module.exports = {
  apps : [{
    name   : "reverie_stories",
    script : "./bin/www",
     env : {
	NODE_ENV : "production",
	PORT : 80,
	DATABASE_URL : "postgresql://postgres.bissoiueecbxdalfpxhc:AB9ZHXbfLrvzHU6z@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres",
	JWT_SECRET_KEY : "halogais",
	GROQ_API_KEY : "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"
	}
  }]
}
