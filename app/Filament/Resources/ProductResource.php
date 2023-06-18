<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Category;
use App\Models\Product;
use Closure;
use Filament\Forms\Components\Card;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\SpatieMediaLibraryImageColumn;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Support\Str;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Card::make()->columns(1)->schema([
                    Grid::make()->schema([
                        TextInput::make('name')
                            ->afterStateUpdated(function (Closure $get, Closure $set, ?string $state) {
                                if (! $get('is_slug_changed_manually') && filled($state)) {
                                    $set('slug', Str::slug($state));
                                }
                            })
                            ->reactive()
                            ->required()
                            ->maxLength(255),
                        TextInput::make('slug')
                            ->afterStateUpdated(function (Closure $set) {
                                $set('is_slug_changed_manually', true);
                            })
                            ->required()
                            ->disabled()
                            ->maxLength(255),
                    ]),
                    Toggle::make('featured')
                        ->required(),
                    RichEditor::make('description')
                        ->required(),
                    Grid::make()->schema([
                        Select::make('category_id')
                            ->label('Category')
                            ->options(Category::all()->pluck('name', 'id'))
                            ->relationship('category', 'name'),
                        Select::make('discount_id')
                            ->label('Discount')
                            ->options(Category::all()->pluck('name', 'id'))
                            ->relationship('discount', 'name'),
                    ]),
                    Grid::make()->schema([
                        TextInput::make('weight')
                            ->numeric()
                            ->type('number')
                            ->required(),
                        TextInput::make('tax')
                            ->numeric()
                            ->type('number')
                            ->required(),
                    ]),
                    SpatieMediaLibraryFileUpload::make('images')
                        ->image()
                        ->collection('products')
                        ->imageResizeMode('cover')
                        ->imageCropAspectRatio('16:9')
                        ->imageResizeTargetWidth('1920')
                        ->imageResizeTargetHeight('1080')
                        ->multiple()
                        ->maxFiles(4)
                        ->responsiveImages()
                        ->acceptedFileTypes(['image/*'])
                        ->required(),
                    Grid::make()->schema([
                        Repeater::make('prices')
                            ->relationship()
                            ->schema([
                                Grid::make(3)->schema([
                                    TextInput::make('price')
                                        ->numeric()
                                        ->type('number')
                                        ->required(),
                                    TextInput::make('min_order')
                                        ->numeric()
                                        ->type('number')
                                        ->required(),
                                    TextInput::make('max_order')
                                        ->numeric()
                                        ->type('number')
                                        ->required(),
                                ]),
                            ])->createItemButtonLabel('Add New Price'),
                        Repeater::make('variants')
                            ->relationship()
                            ->schema([
                                TextInput::make('name')
                                    ->label('Variant Name')
                                    ->required(),
                                Repeater::make('options')
                                    ->schema([
                                        TextInput::make('value')
                                            ->required(),
                                    ])->grid()->createItemButtonLabel('Add New Option'),
                            ])->createItemButtonLabel('Add New Variant'),
                    ]),
                ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->sortable()
                    ->label('ID')
                    ->searchable(),
                SpatieMediaLibraryImageColumn::make('images')
                    ->collection('products')
                    ->square()
                    ->label('Image'),
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('category.name')
                    ->sortable()
                    ->searchable(),
                IconColumn::make('discount.active')
                    ->sortable()
                    ->boolean(),
                IconColumn::make('featured')
                    ->sortable()
                    ->boolean(),
                TextColumn::make('weight')
                    ->icon('heroicon-o-cube')
                    ->iconPosition('after'),
                TextColumn::make('tax')
                    ->icon('heroicon-o-receipt-tax')
                    ->iconPosition('after'),
            ])
            ->filters([
                //
            ])
            ->actions([
                EditAction::make(),
            ])
            ->bulkActions([
                DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            'category' => RelationManagers\CategoryRelationManager::class,
            'discount' => RelationManagers\DiscountRelationManager::class,
            'prices' => RelationManagers\PricesRelationManager::class,
            'variants' => RelationManagers\VariantsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
