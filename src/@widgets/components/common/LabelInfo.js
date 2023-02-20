import React from 'react'
import clsx from 'clsx';
import { CmsLabel } from "@widgets/components";

export const LabelInfo = ({ label = { content: '', className: '' }, info = { content: '', className: '' }, className, children }) => {
    return (
        <div className={clsx(className, 'flex flex-row items-center')}>
            <CmsLabel className={clsx('font-700 mr-10 min-w-80', label.className)} content={`${label.content} :`} />
            {info.content && <CmsLabel className={clsx('', info.className)} content={info.content} />}
            {children}
        </div>
    )
}