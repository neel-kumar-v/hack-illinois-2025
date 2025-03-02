import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import Login from "@/components/Login"
import SignUp from "@/components/SignUp"

import { Link } from "next/link"

export function LoginForm({
  className,
  ...props
}) {
  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          {/* <form> */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Login/>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              {/* <Link href = "/signup">
                Sign Up
              </Link> */}
              <SignUp/>
              {/* <a href="#" className="underline underline-offset-4">
                Sign up
              </a> */}
            </div>
          {/* </form> */}
        </CardContent>
      </Card>
    </div>)
  );
}
