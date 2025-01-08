'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { DefaultValues, FieldValues, useForm, Path, SubmitHandler } from 'react-hook-form';
import { z, ZodType } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { AUTH_FORM_CONFIGS, FormConfig } from '@/constants/formConfig';
import ROUTES from '@/constants/routes';
import { toast } from '@/hooks/use-toast';

import { AuthFormField } from './AuthFormField';

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  formType: 'SIGN_IN' | 'SIGN_UP';
  formConfig: FormConfig;
  onSubmit: (data: T) => Promise<ActionResponse>;
}

export default function AuthForm<T extends FieldValues>({ schema, formType, formConfig, onSubmit }: AuthFormProps<T>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { SIGN_IN, SIGN_UP } = AUTH_FORM_CONFIGS;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: formConfig.defaultValues as DefaultValues<T>,
  });

  const buttonText = isPending
    ? `Signing ${formType === 'SIGN_IN' ? 'In' : 'Up'}...`
    : `Sign ${formType === 'SIGN_IN' ? 'In' : 'Up'}`;

  const handleSubmit: SubmitHandler<T> = async data => {
    startTransition(async () => {
      const result = (await onSubmit(data)) as ActionResponse;

      if (result?.success) {
        toast({
          title: 'Success',
          description: formType === 'SIGN_IN' ? SIGN_IN.successMessage : SIGN_UP.successMessage,
        });

        router.push(ROUTES.HOME);
      } else {
        toast({
          title: `Error ${result?.status}`,
          description: result?.error?.message,
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form className="mt-10 space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        {formConfig.fields.map(field => (
          <AuthFormField key={field.name} field={field} control={form.control} name={field.name as Path<T>} />
        ))}

        <Button
          disabled={isPending}
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900"
        >
          {isPending && <ReloadIcon className="mr-2 size-4 animate-spin" />}
          {buttonText}
        </Button>

        <p>
          {formConfig.altLink.text}
          <Link href={formConfig.altLink.href} className="paragraph-semibold primary-text-gradient">
            {formConfig.altLink.label}
          </Link>
        </p>
      </form>
    </Form>
  );
}
