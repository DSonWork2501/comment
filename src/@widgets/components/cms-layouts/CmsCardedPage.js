import React, { useRef } from 'react';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Typography } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup'

/**
 * @description Layout CardedPage cho nội dung của trang
 * @param icon string,
 * @param title string
 * @param subTitle any
 * @param toolbar node
 * @param content node
 * @param leftSidebarHeader node
 * @param leftSidebarContent node
 * @param rightSidebarHeader node
 * @param rightSidebarContent node
 * @param rightBottomHeader node
 * @param leftBottomHeader node
 */
function CardedPage(props) {
	const { 
		icon, 
		title, 
		subTitle, 
		toolbar, 
		content, 
		leftSidebarHeader, 
		leftSidebarContent, 
		rightSidebarHeader, 
		rightSidebarContent, 
		leftBottomHeader,
		rightBottomHeader, 
		rightHeaderButton,
		innerScroll,
		classNameHeader,
		moreToolbar
	} = props;
	
	const pageLayout = useRef(null);

	return (
		<FusePageCarded
			classes={{
				content: 'flex flex-col',
				contentCard: 'overflow-hidden',
				header: classNameHeader
			}}
			header={
				<div className="flex flex-col flex-1 h-full">
					<div className="flex items-center pt-12 pl-12">
						{leftSidebarHeader && (
							<Hidden lgUp>
								<IconButton
									onClick={ev => pageLayout.current.toggleLeftSidebar()}
									aria-label="open left sidebar"
								>
									<Icon>menu</Icon>
								</IconButton>
							</Hidden>
						)}
						<div className="flex w-full justify-between items-center">
							<div className="w-full flex items-start">
								{icon && (
									<FuseAnimate animation="transition.expandIn" delay={300}>
										<Icon className="text-32">{icon}</Icon>
									</FuseAnimate>
								)}
								<div className="flex flex-col w-full">
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<React.Fragment>
											<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
												{title}
											</Typography>
										</React.Fragment>
									</FuseAnimate>
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="caption">
											{subTitle}
										</Typography>
									</FuseAnimate>
								</div>
							</div>
							<div className="flex-none items-center justify-end">
								{rightHeaderButton && (
									<FuseAnimateGroup enter={{ animation: 'transition.slideRightBigIn' }}>
										{rightHeaderButton}
									</FuseAnimateGroup>
								)}
							</div>
						</div>
					</div>
					<div className="h-full flex items-center justify-between pl-12">
						<div className="flex items-center justify-items-start">
							<FuseAnimateGroup enter={{ animation: 'transition.slideLeftBigIn' }}>
								{leftBottomHeader}
							</FuseAnimateGroup>
						</div>
						<div className="flex items-center justify-end">
							<FuseAnimateGroup enter={{ animation: 'transition.slideRightBigIn' }}>
								{rightBottomHeader}
							</FuseAnimateGroup>
						</div>
					</div>
				</div>
			}
			contentToolbar={toolbar}
			moreToolbar={moreToolbar}
			content={content}
			leftSidebarHeader={leftSidebarHeader}
			leftSidebarContent={leftSidebarContent}
			rightSidebarHeader={rightSidebarHeader}
			rightSidebarContent={rightSidebarContent}
			ref={pageLayout}
			innerScroll={innerScroll}
			sidebarInner
		/>
	);
}

CardedPage.propTypes = {
	icon: PropTypes.string,
	title: PropTypes.string,
	subTitle: PropTypes.any,
	toolbar: PropTypes.node,
	content: PropTypes.node,
	leftSidebarHeader: PropTypes.node,
	leftSidebarContent: PropTypes.node,
	rightSidebarHeader: PropTypes.node,
	rightSidebarContent: PropTypes.node,
	rightBottomHeader: PropTypes.node,
	leftBottomHeader: PropTypes.node,
	rightHeaderButton: PropTypes.node,
	innerScroll: PropTypes.bool,
	classNameHeader: PropTypes.string
}

CardedPage.defaultProps = {
	icon: null,
	title: "",
	subTitle: "",
	toolbar: null,
	content: null,
	leftSidebarHeader: null,
	leftSidebarContent: null,
	rightSidebarHeader: null,
	rightSidebarContent: null,
	leftBottomHeader: null,
	rightBottomHeader: null,
	rightHeaderButton: null,
	innerScroll: true,
	classNameHeader: "min-h-66 h-48 sm:h-96 sm:min-h-96"
}

export default React.memo(CardedPage)
