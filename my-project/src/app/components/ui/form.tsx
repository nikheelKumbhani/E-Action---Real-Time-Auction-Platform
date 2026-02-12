"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/app/lib/utils"
import { Label } from "@/app/components/ui/label"

const FormContext = React.createContext<{
  register: (name: string) => any;
  errors: Record<string, string>;
  getFieldState: (name: string) => { error?: string };
}>({
  register: () => {},
  errors: {},
  getFieldState: () => ({}),
})

const Form = React.forwardRef<
  HTMLFormElement,
  React.HTMLAttributes<HTMLFormElement> & {
    onSubmit: (data: any) => void;
  }
>(({ children, className, onSubmit, ...props }, ref) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const formData = React.useRef<Record<string, any>>({})

  const register = (name: string) => ({
    name,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      formData.current[name] = e.target.value
    },
  })

  const getFieldState = (name: string) => ({
    error: errors[name],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData.current)
  }

  return (
    <FormContext.Provider value={{ register, errors, getFieldState }}>
      <form
        ref={ref}
        className={cn("space-y-4", className)}
        onSubmit={handleSubmit}
        {...props}
      >
        {children}
      </form>
    </FormContext.Provider>
  )
})
Form.displayName = "Form"

const FormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    name: string;
  }
>(({ name, ...props }, ref) => {
  const { register } = React.useContext(FormContext)
  return <div ref={ref} {...register(name)} {...props} />
})
FormField.displayName = "FormField"

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const useFormField = () => {
  const { getFieldState } = React.useContext(FormContext)
  const itemContext = React.useContext(FormItemContext)
  
  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>")
  }

  const { id } = itemContext
  const fieldState = getFieldState(id)

  return {
    id,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error: fieldState.error,
  }
}

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return <input ref={ref} className={cn("flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { errors } = React.useContext(FormContext)
  const name = (props as any)['data-name']
  const error = name ? errors[name] : undefined

  if (!error && !children) return null

  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {error || children}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
}
