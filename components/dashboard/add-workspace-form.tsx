"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { X, ImagePlus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { WORKSPACE_FEATURES } from "@/utils/features";
import api from "@/lib/axios";

interface Package {
  label: string;
  price: number | "";
  description: string;
}

const EMPTY_PACKAGE: Package = { label: "", price: "", description: "" };

export function AddWorkspaceForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [images, setImages] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [packages, setPackages] = useState<Package[]>([{ ...EMPTY_PACKAGE }]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    address: "",
    shortAddress: "",
    phone: "",
    whatsapp: "",
    facebook: "",
    open: "",
    close: "",
    startingFrom: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleFeature = (value: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
  };

  const updatePackage = (
    index: number,
    field: keyof Package,
    value: string
  ) => {
    setPackages((prev) =>
      prev.map((pkg, i) =>
        i === index
          ? { ...pkg, [field]: field === "price" ? Number(value) || "" : value }
          : pkg
      )
    );
  };

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    try {
      await api.post("/workspaces", {
        name: form.name,
        description: form.description,
        address: form.address,
        shortAddress: form.shortAddress,
        images,
        features: selectedFeatures,
        pricing: {
          startingFrom: Number(form.startingFrom),
          packages: packages.filter((p) => p.label && p.price),
        },
        workingHours: {
          open: form.open,
          close: form.close,
        },
        contact: {
          phone: form.phone,
          whatsapp: form.whatsapp,
          facebook: form.facebook,
        },
      });

      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Basic Info */}
      <Card className="p-6 space-y-4 border-border">
        <h2 className="font-jakarta font-bold text-base text-on-surface">
          Basic Info
        </h2>

        <div className="space-y-2">
          <Label className="font-inter">Name</Label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Workspace name"
            className="font-inter"
          />
        </div>

        <div className="space-y-2">
          <Label className="font-inter">Description</Label>
          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the workspace..."
            rows={4}
            className="font-inter resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="font-inter">Full Address</Label>
            <Input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Full address"
              className="font-inter"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-inter">Short Address</Label>
            <Input
              name="shortAddress"
              value={form.shortAddress}
              onChange={handleChange}
              placeholder="e.g. Al Mohafza, Assiut"
              className="font-inter"
            />
          </div>
        </div>
      </Card>

      {/* Images */}
      <Card className="p-6 space-y-4 border-border">
        <h2 className="font-jakarta font-bold text-base text-on-surface">
          Images
        </h2>

        <div className="flex flex-wrap gap-3">
          {images.map((url, i) => (
            <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border border-border">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))}
                className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 hover:bg-black/80"
              >
                <X size={12} className="text-white" />
              </button>
            </div>
          ))}

          {images.length < 5 && (
            <CldUploadWidget
              uploadPreset="hena_preset"
              onSuccess={(result) => {
                const info = result.info as { secure_url: string };
                setImages((prev) => [...prev, info.secure_url]);
              }}
            >
              {({ open }) => (
                <button
                  onClick={() => open()}
                  className="w-24 h-24 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-[#f5f2ff] transition-colors flex flex-col items-center justify-center gap-1"
                >
                  <ImagePlus size={20} className="text-on-surface-variant" />
                  <span className="text-xs font-plex text-on-surface-variant">
                    Add
                  </span>
                </button>
              )}
            </CldUploadWidget>
          )}
        </div>
        <p className="text-xs font-inter text-on-surface-variant">
          Upload up to 5 images. First image will be used as the cover.
        </p>
      </Card>

      {/* Pricing */}
      <Card className="p-6 space-y-4 border-border">
        <h2 className="font-jakarta font-bold text-base text-on-surface">
          Pricing
        </h2>

        <div className="space-y-2">
          <Label className="font-inter">Starting From (EGP)</Label>
          <Input
            name="startingFrom"
            type="number"
            value={form.startingFrom}
            onChange={handleChange}
            placeholder="e.g. 25"
            className="font-inter w-40"
          />
        </div>

        <div className="space-y-3">
          <Label className="font-inter">Packages</Label>
          {packages.map((pkg, i) => (
            <div key={i} className="grid grid-cols-[1fr_100px_1fr_36px] gap-2 items-start">
              <Input
                placeholder="Label"
                value={pkg.label}
                onChange={(e) => updatePackage(i, "label", e.target.value)}
                className="font-inter text-sm"
              />
              <Input
                type="number"
                placeholder="Price"
                value={pkg.price}
                onChange={(e) => updatePackage(i, "price", e.target.value)}
                className="font-inter text-sm"
              />
              <Input
                placeholder="Description"
                value={pkg.description}
                onChange={(e) => updatePackage(i, "description", e.target.value)}
                className="font-inter text-sm"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPackages((prev) => prev.filter((_, j) => j !== i))}
                className="text-destructive hover:bg-red-50"
                disabled={packages.length === 1}
              >
                <Trash2 size={15} />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPackages((prev) => [...prev, { ...EMPTY_PACKAGE }])}
            className="font-plex gap-2 text-primary border-primary hover:bg-[#f5f2ff]"
          >
            <Plus size={15} />
            Add Package
          </Button>
        </div>
      </Card>

      {/* Features */}
      <Card className="p-6 space-y-4 border-border">
        <h2 className="font-jakarta font-bold text-base text-on-surface">
          Features
        </h2>
        <div className="flex flex-wrap gap-2">
          {WORKSPACE_FEATURES.map((feature) => (
            <button
              key={feature.value}
              onClick={() => toggleFeature(feature.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-plex transition-colors border ${
                selectedFeatures.includes(feature.value)
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-on-surface-variant border-border hover:border-primary hover:text-primary"
              }`}
            >
              {feature.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Working Hours */}
      <Card className="p-6 space-y-4 border-border">
        <h2 className="font-jakarta font-bold text-base text-on-surface">
          Working Hours
        </h2>
        <div className="flex items-center gap-4">
          <div className="space-y-2">
            <Label className="font-inter">Opens at</Label>
            <Input
              name="open"
              type="time"
              value={form.open}
              onChange={handleChange}
              className="font-inter w-36"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-inter">Closes at</Label>
            <Input
              name="close"
              type="time"
              value={form.close}
              onChange={handleChange}
              className="font-inter w-36"
            />
          </div>
        </div>
      </Card>

      {/* Contact */}
      <Card className="p-6 space-y-4 border-border">
        <h2 className="font-jakarta font-bold text-base text-on-surface">
          Contact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="font-inter">Phone</Label>
            <Input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="01xxxxxxxxx"
              className="font-inter"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-inter">WhatsApp</Label>
            <Input
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              placeholder="01xxxxxxxxx"
              className="font-inter"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-inter">Facebook URL</Label>
            <Input
              name="facebook"
              value={form.facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
              className="font-inter"
            />
          </div>
        </div>
      </Card>

      {/* Error */}
      {error && (
        <p className="text-sm font-inter text-destructive">{error}</p>
      )}

      {/* Submit */}
      <div className="flex gap-3 pb-8">
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="font-plex font-medium px-8"
        >
          {loading ? "Adding..." : "Add Workspace"}
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard")}
          className="font-plex"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}