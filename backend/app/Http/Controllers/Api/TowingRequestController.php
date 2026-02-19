<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TowingRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;

class TowingRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TowingRequest::latest()->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'customer_name' => 'required',
                'location'      => 'required',
                'note'          => 'nullable'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], 422);
            }

            $towing = TowingRequest::create([
                'customer_name'  => $request->customer_name,
                'location'       => $request->location,
                'note'           => $request->note,
                'latitude'       => $request->latitude,
                'longitude'      => $request->longitude,
            ]);
            
            return response()->json([
                'message'   => 'Request created successfully',
                'towing'    => $towing
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function accept($id)
    {
        try {
            $request = TowingRequest::findOrFail($id);

            if ($request->status === 'assigned') {
                return response()->json([
                    'message' => 'Already assigned'
                ], 400);
            }

            $driverName = auth()->user()->name ?? 'Driver';

            $request->update([
                'status' => 'assigned',
                'driver_name' => $driverName
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Request accepted',
                'data' => $request
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Request not found'
            ], 404);
        }
    }

    public function getGeoCode(Request $request)
    {
        $response = Http::withHeaders([
            'User-Agent' => 'LaravelApp'
        ])->get('https://nominatim.openstreetmap.org/reverse', [
            'lat' => $request->lat,
            'lon' => $request->lng,
            'format' => 'json'
        ]);

        return response()->json($response->json());
    }
}
