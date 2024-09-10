'use server'

// server action
export async function submitForm(formDate: any) {
    console.log(formDate.get('email'))
}