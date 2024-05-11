'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'
import LoadingButton from '../ui/LoaderButton';

export default function FormSubmitButton(
    props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {

    const { pending } = useFormStatus();

    return (
        <LoadingButton {...props} type='submit' loading={pending} />
    )
}