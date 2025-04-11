'use client'

import { ReviewDto } from '@/api/review/review.api'
import { useMyContext } from '@/context/my-context'
import { Settings } from '@/modules/settings/settings'
import { SettingsReviewForm } from './review-form'

export const SettingsReview = ({
	data,
	iconClassname,
	theme,
	formTitle,
}: {
	data: ReviewDto
	iconClassname?: string
	theme?: 'light' | 'dark'
	formTitle: string
}) => {
	const roles = useMyContext().roles
	if (!roles.reviewPut && !roles.reviewDelete) return null

	return (
		<Settings
			Component={SettingsReviewForm}
			iconClassname={iconClassname}
			type='review'
			data={data}
			theme={theme}
			formTitle={formTitle}
			isDeleted={false}
		/>
	)
}
