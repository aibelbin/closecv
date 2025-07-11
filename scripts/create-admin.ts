import { createClient } from "@supabase/supabase-js"

// Use your service role key for admin operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // Service role key, not anon key

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function createAdminUser() {
  const email = "admin@yourdomain.com" // Change this to your email
  const password = "your-secure-password" // Change this to your password

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm the email
    })

    if (error) {
      console.error("Error creating admin user:", error.message)
      return
    }

    console.log("✅ Admin user created successfully!")
    console.log("Email:", email)
    console.log("User ID:", data.user?.id)
    console.log("You can now login at /admin/login")
  } catch (error) {
    console.error("Unexpected error:", error)
  }
}

createAdminUser()
