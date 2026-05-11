"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
	images: string[];
}

export default function WorkspaceGallery({ images }: Props) {
	const [selectedImage, setSelectedImage] = useState(images[0]);

	return (
		<section className="overflow-hidden rounded-2xl">
			<div className="grid gap-2 lg:grid-cols-[1fr_420px]">
				{/* Main Image */}
				<div className="relative h-80 overflow-hidden rounded-2xl md:h-125">
					<Image
						src={selectedImage}
						alt="Workspace image"
						fill
						priority
						className="object-cover transition-all duration-500"
					/>
				</div>

				{/* Thumbnails */}
				<div className="grid grid-cols-2 gap-2">
					{images.slice(0, 4).map((image, index) => {
						const isActive = selectedImage === image;

						return (
							<button
								key={index}
								onClick={() => setSelectedImage(image)}
								className={`
                  relative h-38.75 overflow-hidden rounded-2xl border-2 transition-all duration-200 md:h-61
                  ${isActive ? "border-primary" : "border-transparent hover:border-primary/30"}
                `}
							>
								<Image
									src={image}
									alt={`Workspace image ${index + 1}`}
									fill
									className={`object-cover transition-transform duration-300 ${
										isActive ? "scale-[1.02]" : "hover:scale-105"
									}`}
								/>
								<div
									className={`absolute inset-0 transition-colors duration-200 ${
										isActive ? "bg-black/10" : "bg-black/20 hover:bg-black/10"
									}`}
								/>
							</button>
						);
					})}
				</div>
			</div>
		</section>
	);
}
