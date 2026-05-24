import { z } from 'zod'

// ─── Newsletter ───────────────────────────────────────────────────────────────

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export type NewsletterInput = z.infer<typeof newsletterSchema>

// ─── Contact ─────────────────────────────────────────────────────────────────

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

export type ContactInput = z.infer<typeof contactSchema>

// ─── Opportunity Submit ───────────────────────────────────────────────────────

export const opportunitySubmitSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  organization: z.string().min(2, 'Organization name is required'),
  type: z.enum(['fellowship', 'grant', 'event', 'competition', 'internship', 'volunteer', 'training', 'job']),
  theme: z.array(z.string()).min(1, 'Select at least one theme'),
  countries: z.array(z.string()).min(1, 'Select at least one country'),
  format: z.enum(['in-person', 'online', 'hybrid']),
  deadline: z.string().optional(),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  link: z.string().url('Please enter a valid URL'),
  contactEmail: z.string().email('Please enter a valid contact email'),
  stipend: z.boolean().optional(),
  funded: z.boolean().optional(),
})

export type OpportunitySubmitInput = z.infer<typeof opportunitySubmitSchema>

// ─── Directory Join ───────────────────────────────────────────────────────────

export const directoryJoinSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  type: z.enum(['ngo', 'youth-group', 'individual', 'institution', 'business']),
  country: z.string().min(2, 'Please select a country'),
  city: z.string().optional(),
  description: z.string().min(30, 'Description must be at least 30 characters'),
  themes: z.array(z.string()).min(1, 'Select at least one theme'),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  email: z.string().email('Please enter a valid email address'),
})

export type DirectoryJoinInput = z.infer<typeof directoryJoinSchema>

// ─── Get Involved ─────────────────────────────────────────────────────────────

export const getInvolvedSchema = z.object({
  pathway: z.enum(['youth', 'ngo', 'consultant', 'partner']),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  organization: z.string().optional(),
  country: z.string().min(2, 'Please select a country'),
  message: z.string().max(500).optional(),
})

export type GetInvolvedInput = z.infer<typeof getInvolvedSchema>

// ─── Event Registration ───────────────────────────────────────────────────────

export const eventRegistrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  country: z.string().min(2, 'Please select a country'),
  organization: z.string().optional(),
  eventSlug: z.string(),
})

export type EventRegistrationInput = z.infer<typeof eventRegistrationSchema>
