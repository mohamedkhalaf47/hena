"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, PlusCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import api from "@/lib/axios";

interface Workspace {
	_id: string;
	name: string;
	shortAddress: string;
	averageRating: number;
	reviewsCount: number;
	pricing: { startingFrom: number };
	createdAt: string;
}

export function WorkspacesTable({ workspaces }: { workspaces: Workspace[] }) {
	const router = useRouter();
	const [deleting, setDeleting] = useState<string | null>(null);

	const handleDelete = async (id: string) => {
		setDeleting(id);
		try {
			await api.delete(`/workspaces/${id}`);
			router.refresh();
		} catch (error) {
			console.error("Failed to delete workspace:", error);
		} finally {
			setDeleting(null);
		}
	};

	return (
		<div className="bg-white rounded-xl border border-border overflow-hidden">
			{/* Header */}
			<div className="flex items-center justify-between px-6 py-4 border-b border-border">
				<h2 className="font-jakarta font-bold text-lg text-on-surface">
					Workspaces
				</h2>
				<Button asChild size="sm" className="font-plex gap-2">
					<Link href="/dashboard/workspaces/new">
						<PlusCircle size={16} />
						Add New
					</Link>
				</Button>
			</div>

			{/* Table */}
			<Table>
				<TableHeader>
					<TableRow className="bg-[#f5f2ff]">
						<TableHead className="font-plex font-semibold text-on-surface">
							Name
						</TableHead>
						<TableHead className="font-plex font-semibold text-on-surface">
							Location
						</TableHead>
						<TableHead className="font-plex font-semibold text-on-surface">
							Starting Price
						</TableHead>
						<TableHead className="font-plex font-semibold text-on-surface">
							Rating
						</TableHead>
						<TableHead className="font-plex font-semibold text-on-surface">
							Reviews
						</TableHead>
						<TableHead />
					</TableRow>
				</TableHeader>
				<TableBody>
					{workspaces.map((ws) => (
						<TableRow key={ws._id} className="hover:bg-[#fafafa]">
							<TableCell className="font-jakarta font-semibold text-on-surface">
								{ws.name}
							</TableCell>
							<TableCell className="font-inter text-sm text-on-surface-variant">
								{ws.shortAddress}
							</TableCell>
							<TableCell className="font-inter text-sm text-primary font-semibold">
								{ws.pricing.startingFrom} EGP
							</TableCell>
							<TableCell>
								<span className="flex items-center gap-1 font-inter text-sm text-on-surface">
									<Star size={14} className="fill-amber-400 text-amber-400" />
									{ws.averageRating > 0 ? ws.averageRating.toFixed(1) : "—"}
								</span>
							</TableCell>
							<TableCell className="font-inter text-sm text-on-surface-variant">
								{ws.reviewsCount}
							</TableCell>
							<TableCell>
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button
											variant="ghost"
											size="icon"
											className="text-destructive hover:text-destructive hover:bg-red-50"
											disabled={deleting === ws._id}
										>
											<Trash2 size={16} />
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle className="font-jakarta">
												Delete {ws.name}?
											</AlertDialogTitle>
											<AlertDialogDescription className="font-inter">
												This action cannot be undone. This will permanently
												delete the workspace and all its reviews.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel className="font-plex">
												Cancel
											</AlertDialogCancel>
											<AlertDialogAction
												onClick={() => handleDelete(ws._id)}
												className="bg-destructive hover:bg-destructive/90 font-plex"
											>
												Delete
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
